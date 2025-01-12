import { img1, img2, img3, img4 } from '@/assets/images/index.js';


const ImageFlow = () => {
  const steps = [
    {
      title: "Upload few of your images",
      description: "Train the model with your images.",
      completed: true,
      images: [
       img4, img2, img3
      ]
    },
    {
      title: "Write your Prompt",
      description: "Provide a suitable prompt to define the way you want your image",
      completed: true,
      prompt: "Generate image of myself posing with a camera in hand and wearing a jacket and a cap, with Effle tower in the background"
    },
    {
      title: "Get your AI generated Images",
      description: "Get the photorealistic images and use them in your social and commercial applications",
      completed: false,
      resultImage: img1
    }
  ];

  return (
    <div className="max-w-full   mx-auto mt-48">
      <div className="relative flex justify-center ">
        {/* Center Timeline */}
        <div className="absolute top-0 bottom-0 rounded-md w-1.5 bg-gradient-to-b from-blue-500 via-fuchsia-500 to-fuchsia-50 "/>
        
   
        <div className="relative w-full flex flex-col">
          {steps.map((step, index) => (
            <div key={index} className="mb-24 ">
          
            <div className="flex justify-center">
                <div className={`w-6 h-6 rounded-full bg-gray-300
                  relative z-10 flex items-center justify-center`}>
                 <div className="w-2 h-2  rounded-full bg-white" />
                </div>
              </div>

        
              <div className={`flex w-full gap-8 justify-between mt-12 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
            
                
                  <>
                     <div className={`w-1/2 flex flex-col  ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <h3 className="text-xl md:text-3xl font-bold mb-2">{step.title}</h3>
                      <p className={`text-gray-600 text-sm ${index%2===0 && 'lg:pl-16'}`}>{step.description}</p>
                    </div>
                    <div className="w-1/2 flex justify-center">
                      {index === 0 && (
                        <div className="flex flex-col  justify-center">
                          {step.images.map((img, i) => (
                            <img key={i} src={img} alt={`Training ${i + 1}`} 
                              className={`w-16 h-16 md:w-32 md:h-32 object-cover shadow-lg shadow-neutral-500 rounded-lg transform ${i===0 && '-rotate-[30deg] translate-y-4'} ${i===2 && 'rotate-[30deg] -translate-y-2 sm:-translate-y-4'} ${i===1 && '-translate-y-1 sm:-translate-y-3 rotate-12'}`} />
                          ))}
                         
                    

                        </div>
                      )}
                       {index === 1 && (
                        <div className=" bg-white drop-shadow-md p-4 rounded-lg">
                          <div className='bg-gray-100 p-2 rounded-lg'>
                          <p className="text-xs md:text-sm text-[#1a1a1a]">{step.prompt}</p>
                          </div>
                         
                        </div>
                      )}
                        {index === 2 && (
                        <div className="mt-4 relative">
                         <div className="absolute h-max w-max text-xs  top-2 right-2 bg-white/60 backdrop-blur-md text-neutral-900 px-2 py-1 rounded-full">
                       AI Generated
                    </div>
                          <img src={step.resultImage} alt="AI Generated result" 
                            className="h-40 w-40 md:w-60 md:h-60 rounded-lg object-cover shadow-lg shadow-neutral-600" />
                        </div>
                      )}
                    </div>
                   
                  </>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageFlow;