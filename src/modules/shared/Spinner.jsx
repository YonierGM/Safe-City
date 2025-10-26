export function Spinner({ size = "10", color }) {
    const sizeClass = `w-${size} h-${size}`;
    return (
        <div className={`relative ${sizeClass} animate-spin-slow`}>
            <div className="absolute top-0 left-1/2 w-3/5 h-3/5 -translate-x-1/2 rounded-full animate-bounce-dot"
                style={{ backgroundColor: color }}
            />
            <div className="absolute bottom-0 left-1/2 w-3/5 h-3/5 -translate-x-1/2 bg-{color} rounded-full animate-bounce-dot delay-1000"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}