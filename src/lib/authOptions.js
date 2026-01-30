import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNamesObj } from "./dbConnect";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await loginUser(credentials)
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })


    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Console these to check necessary properites
            //console.log({ user, account, profile, email, credentials })
            if (account) {
                const { providerAccountId, provider } = account
                const { email: user_email, image, name } = user
                const userCollection = dbConnect(collectionNamesObj.userCollection)
                const isExisted = await userCollection.findOne({ providerAccountId })
                if (!isExisted) {
                    const payload = { providerAccountId, provider, email: user_email, image, name, role: 'user' }
                    await userCollection.insertOne(payload)
                }
            }
            return true
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.role = user.role
                token.id = user._id
            }
            // If it's an OAuth login (account is present), we might need to fetch the role from DB if it wasn't passed in `user`
            // But for efficiency, let's assume `loginUser` returns the full user object including role for credentials.
            // For OAuth, the `signIn` callback runs before `jwt` partially, but `user` in `jwt` on first sign in is the profile info.
            // It gets complicated. A robust way is to fetch from DB if role is missing in token.

            // However, sticking to the plan:
            // For credentials, `authorize` returns the user object. If that object has `role`, it lands in `user` here.

            // For OAuth, subsequent requests won't have `user` or `account`. We need to rely on what's in `token`.

            // Let's reload user from DB if we want to be super sure, or just trust the initial load.
            // For now, let's try to keeping it simple:
            if (account && user) {
                // Fetch real user from DB to get the role because the initial `user` object from OAuth provider definitely doesn't have our DB role.
                const userCollection = dbConnect(collectionNamesObj.userCollection)
                const dbUser = await userCollection.findOne({ email: token.email })
                if (dbUser) {
                    token.role = dbUser.role
                    token.id = dbUser._id
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role
                session.user.id = token.id
            }
            return session
        }
    }
}