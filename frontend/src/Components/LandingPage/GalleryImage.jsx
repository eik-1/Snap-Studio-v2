export default function GalleryImage({ src, index, onClick }) {
    return (
        <div
            className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={onClick}
        >
            <img
                src={src}
                alt={`${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                id={`image-${index}`}
            />
        </div>
    )
}
