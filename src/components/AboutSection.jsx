import Image from "next/image";

const AboutSection = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:w-1/2 relative">
                    <div className="w-3/4 h-[473px] relative after:content-[''] after:absolute after:w-full after:h-full after:bg-none after:rounded-lg">
                        <Image
                            src="/assets/images/about_us/person.jpg"
                            alt="person"
                            fill
                            className="w-3/4 rounded-lg shadow-2xl object-cover"
                        />
                    </div>

                    <div className="absolute right-5 top-1/2 w-1/2 h-[332px] border-8 border-white rounded-lg shadow-2xl overflow-hidden">
                        <Image
                            src="/assets/images/about_us/parts.jpg"
                            alt="parts"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="lg:w-1/2 space-y-5 p-4">
                    <h3 className="text-3xl text-[#FF3811] font-bold">About Us</h3>
                    <h1 className="text-5xl font-bold">
                        We are qualified & of experience in this field
                    </h1>
                    <p className="py-6 text-[#737373]">
                        There are many variations of passages of Lorem Ipsum available, but
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don't look even slightly
                        believable.
                    </p>
                    <p className="py-6 text-[#737373]">
                        the majority have suffered alteration in some form, by injected
                        humour, or randomised words which don't look even slightly
                        believable.
                    </p>
                    <button className="btn btn-error text-white bg-[#FF3811] border-none hover:bg-[#FF3811]">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
