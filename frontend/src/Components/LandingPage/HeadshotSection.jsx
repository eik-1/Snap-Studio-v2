import { img1, img2 } from "@/assets/headshot-images"

export default function HeadshotSection() {
    return (
        <div className="relative -mx-28 my-24">
            <div className="relative py-16 px-20 min-h-[600px] rounded-[25px] bg-gradient-to-br from-slate-50 via-rose-50 to-rose-100">
                <div className="max-w-full mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl px-8">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                Need a Studio-Quality Headshot to Stand Out on
                                Professional Profiles?
                            </h2>
                            <h3 className="text-3xl font-bold text-gray-800 mb-6">
                                We've Got You Covered
                            </h3>
                            <p className="text-lg text-gray-600">
                                Upload a few of your photos and easily generate
                                professional headshots with custom backgrounds
                                and personalized details using prompts.
                            </p>
                        </div>

                        <div className="relative w-[400px] h-[400px]">
                            <div className="absolute left-0 top-0 rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src={img1}
                                    alt="Professional male headshot"
                                    className="w-72 h-72 object-cover"
                                />
                            </div>
                            <div className="absolute right-0 top-[11rem] rounded-3xl overflow-hidden shadow-xl">
                                <img
                                    src={img2}
                                    alt="Professional female headshot"
                                    className="w-72 h-72 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
