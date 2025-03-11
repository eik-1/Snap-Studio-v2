import { img1, img2, img3, img4 } from '@/assets/images/index.js';
import { Camera, Upload, Sparkles, CheckCircle } from 'lucide-react';

const ImageFlow = () => {
  const steps = [
    {
      title: "Upload few of your images",
      description: "Train the model with your images.",
      completed: true,
      images: [
       img4, img2, img3
      ],
      icon: <Upload className="text-white" size={24} />
    },
    {
      title: "Write your Prompt",
      description: "Provide a suitable prompt to define the way you want your image",
      completed: true,
      prompt: "Generate image of myself posing with a camera in hand and wearing a jacket and a cap, with Eiffel tower in the background",
      icon: <Sparkles className="text-white" size={24} />
    },
    {
      title: "Get your AI generated Images",
      description: "Get the photorealistic images and use them in your social and commercial applications",
      completed: false,
      resultImage: img1,
      icon: <Camera className="text-white" size={24} />
    }
  ];

  return (
    <div className="max-w-full mx-auto relative">
    
      <div className="absolute -top-20 left-0  w-64 h-64 bg-purple-100 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-0  w-72 h-72 bg-pink-100 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-orange-100 rounded-full blur-3xl"></div>
      
      
      
      <div className="relative flex justify-center">
        {/* Center Timeline */}
        <div className="absolute top-0 bottom-0 rounded-md w-1.5 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400">

          
        </div>
        
        <div className="relative w-full flex flex-col">
          {steps.map((step, index) => (
            <div key={index} className="mb-24">
             
              <div className="flex justify-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${index === 0 ? 'from-purple-400 to-purple-600' : index === 1 ? 'from-pink-400 to-pink-600' : 'from-orange-400 to-orange-600'}
                  relative z-10 flex items-center justify-center shadow-lg border-2 border-white`}>
                  {step.icon}
                 
                </div>
              </div>

              <div className={`flex w-full gap-8 justify-between items-center mt-12 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-1/2 flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                  <h3 className={`text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r  bg-clip-text text-transparent from-black to-black/75`}>{step.title}</h3>
                  <p className={`text-gray-600 tracking-wide text-lg leading-relaxed max-w-md`}>{step.description}</p>
                  
                 
                  <div className={`h-1 w-24 mt-4 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-purple-500 to-purple-300' : 
                    index === 1 ? 'from-pink-500 to-pink-300' : 
                    'from-orange-500 to-orange-300'
                  }`}></div>
                </div>
                
                <div className="w-1/2 flex justify-center">
                 
                  {index === 0 && (
                    <div className="flex flex-col justify-center relative">
                 
                      <div className="absolute -inset-4 bg-purple-50/30 rounded-xl backdrop-blur-sm -z-10"></div>
                      <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full border border-dashed border-purple-300 -z-10"></div>
                      
                      {step.images.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          alt={`Training ${i + 1}`} 
                          className={`w-16 h-16 md:w-32 md:h-32 object-cover shadow-lg shadow-neutral-500/20 rounded-lg transform 
                            ${i===0 && '-rotate-[30deg] translate-y-4 border-2 border-white'} 
                            ${i===2 && 'rotate-[30deg] -translate-y-2 sm:-translate-y-4 border-2 border-white'} 
                            ${i===1 && '-translate-y-1 sm:-translate-y-3 rotate-12 border-2 border-white'}`} 
                        />
                      ))}
                      
                  
                      <div className="absolute -right-2 bottom-1/2 bg-purple-100 backdrop-blur-xl text-purple-600 text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-purple-200 flex items-center gap-1">
                        <Upload size={12} /> Uploaded
                      </div>
                    </div>
                  )}
                  
            
                  {index === 1 && (
                    <div className="bg-gradient-to-br min-h-40 w-4/5 from-slate-50/85 to-pink-50/85 backdrop-blur-xl p-5 rounded-xl mt-4 z-40 shadow-lg border border-white/80 relative">
                   
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-100 border border-pink-200"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-100 border border-purple-200"></div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center border-b border-pink-200/70 pb-2">
                          <h2 className="text-black/80 font-semibold flex items-center gap-2">
                            <Sparkles size={16} className="text-pink-500" />
                            Prompt      
                          </h2>
                          <div className="space-x-1.5 hidden sm:flex">
                            <div className="w-2.5 h-2.5 rounded-full bg-pink-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                          </div>
                        </div>

                        <div className="relative pt-3">
                          <p className="text-black/90 text-base leading-relaxed">
                            {steps[index].prompt}
                          </p>
                          
                          
                      
                        </div>
                      </div>
                    </div>
                  )}
                  
                
                  {index === 2 && (
                    <div className="mt-4 relative group">
                     
                      <div className="absolute -inset-4 bg-orange-50/20 rounded-xl backdrop-blur-sm -z-10 transition-all duration-300"></div>
                      <div className="absolute w-full h-full -rotate-6 rounded-lg border-2 border-dashed border-orange-200/50 -z-10"></div>
                      
                      <div className="absolute h-max w-max text-xs top-2 right-2 bg-gradient-to-r from-orange-400 to-purple-400 text-white px-3 py-1 rounded-full font-medium shadow-md border border-white/50">
                        AI Generated
                      </div>
                      <img 
                        src={step.resultImage} 
                        alt="AI Generated result" 
                        className="h-40 w-40 md:w-60 md:h-60 rounded-lg object-cover shadow-lg shadow-neutral-600/40 transition-all duration-300   border-2 border-white" 
                      />
                     
                      
                 
                      <div className="absolute top-1/2 -right-6 w-6 h-6 rounded-full border border-dashed border-orange-300/80 transition-all duration-500"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
   
    </div>
  );
};

export default ImageFlow;