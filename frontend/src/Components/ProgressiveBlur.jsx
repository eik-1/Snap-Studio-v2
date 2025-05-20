"use client";
function ProgressiveBlur() {
  return (
    <>
      <ProgressiveBlurDesktop />
      <ProgressiveBlurMobile />
    </>
  );
}

function ProgressiveBlurDesktop() {
  const blurLevels = [
    { blur: '0', maskGradient: '0%, 20%' },
    { blur: '0.205761px', maskGradient: '10%, 30%' },
    { blur: '0.823045px', maskGradient: '20%, 40%' },
    { blur: '1.85185px', maskGradient: '30%, 50%' },
    { blur: '3.29218px', maskGradient: '40%, 60%' },
    { blur: '5.14403px', maskGradient: '50%, 70%' },
    { blur: '7.40741px', maskGradient: '60%, 80%' },
    { blur: '10.0823px', maskGradient: '70%, 90%' },
    { blur: '13.1687px', maskGradient: '80%, 100%' },
    { blur: '16.6667px', maskGradient: '90%, 100%' },
  ];

  return (
    <div className="fixed rotate-180 top-0 inset-x-0  w-full h-16 z-40 hidden s:block">
      {blurLevels.map((level, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full"
          style={{
            backdropFilter: `blur(${level.blur})`,
            maskImage: `linear-gradient(rgba(0, 0, 0, 0) ${level.maskGradient.split(', ')[0]}, rgb(0, 0, 0) ${level.maskGradient.split(', ')[1]})`,
            zIndex: index + 1,
          }}
        />
      ))}
    </div>
  );
}

function ProgressiveBlurMobile() {
  const blurLevels = [
    { blur: '2px', maskGradient: '0%, 50%' },
    { blur: '8px', maskGradient: '40%, 100%' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 w-full h-[10dvh] z-40 s:hidden">
      {blurLevels.map((level, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full"
          style={{
            backdropFilter: `blur(${level.blur})`,
            maskImage: `linear-gradient(rgba(0, 0, 0, 0) ${level.maskGradient.split(', ')[0]}, rgb(0, 0, 0) ${level.maskGradient.split(', ')[1]})`,
            zIndex: index + 1,
          }}
        />
      ))}
    </div>
  );
}

export default ProgressiveBlur;