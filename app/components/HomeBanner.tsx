import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="relative bg-gray-800 mb-8">
            <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
                <Image
                    src='/usp-banner.webp'
                    layout='fill'
                    objectFit='cover'
                    quality={100} 
                    alt='Banner Image'
                    className="z-0"
                />
                <div className="absolute bottom-0 left-0 right-0 text-center p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <h1 className="text-3xl md:text-5xl text-white mb-4">Beautiful Sound In Every Room</h1>
                    <p className="text-xl md:text-2xl text-white mb-2">Discover Now!</p>
                </div>
            </div>
        </div> 
    );
}
 
export default HomeBanner;
