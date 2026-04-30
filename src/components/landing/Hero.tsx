import Link from "next/link"
import SocialProof from "./SocialProof";

const Hero = () => {
    return (
        <div className="border-b border-raised p-8">
            <div className="flex justify-center">
                <div>
                    <div className="flex justify-center mb-4">
                        <span className="rounded-full border border-violet/30 bg-violet/15 px-3 py-1 text-violet text-sm font-medium">Now with AI recommendations</span>
                    </div>
                    <h1 className="text-3xl font-semibold text-center mb-4">
                        Your TV and movie universe,{" "}
                        <span className="block text-brand">finally organized</span>
                    </h1>
                    <p className="max-w-md mx-auto text-center text-muted mb-4">
                        Track what you&apos;ve watched, discover what&apos;s next, and see what your friends are into — all in one place.
                    </p>
                    <div className='flex justify-center my-4'>
                        <Link 
                            href="#" 
                            className="inline-block rounded-md bg-brand py-2 px-4 text-primary mr-4"
                        >
                            Start tracking free
                        </Link>
                        <Link 
                            href="#" 
                            className="inline-block border rounded-md py-2 px-4 text-primary"
                        >
                            See how it works
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className="flex">
                            <SocialProof />
                            <div>
                                <p className='text-sm text-muted'>Joined by <span className="font-bold text-primary">2,400+</span> movie lovers this month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Hero;