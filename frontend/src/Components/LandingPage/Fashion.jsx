function FashionSection()
{
    return(
        
        <div className="relative w-full rounded-xl border">
        <video
            alt="app running"
            className="h-full w-full object-fill rounded-xl"
            autoPlay
            muted
            loop
            playsInline
        >
            <source
                src={`https://qlyojdnywhpjejyxukld.supabase.co/storage/v1/object/public/videos//fashion.mp4`}
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
    </div>
    )
}
export default FashionSection