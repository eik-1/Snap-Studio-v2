import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { CircleX } from 'lucide-react';
import promptOutput from '../assets/output.webp';
function PromptDescription({ isOpen, handleClose }) {

  function onClose()
  {
    handleClose();
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bg-[#00000038] backdrop-blur-[12px] h-[100dvh] w-[100dvw] z-[80]  fixed inset-0 flex items-center justify-center font-sans "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-[24rem] sm:h-[32rem]  w-[48rem] bg-[#ffffff]  border-[1px] p-8 rounded-2xl relative flex justify-start gap-2 font-sans origin-top overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
          >
            <div
              className="absolute right-5 top-5 h-max w-max cursor-pointer"
              onClick={onClose}
            >
              <CircleX color="#00000089" />
            </div>
            <div className='flex flex-col h-max w-max'>
                <h2 className='font-bold text-2xl bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent '>Writing Clear Prompts</h2>
                <p className='text-gray-700 text-[0.875rem] mb-4'>Writing clear prompts is important for getting the best results.</p>
                <h3 className='font-semibold text-gray-600 text-xl'>Some Key Rules</h3>
                <ul className='mt-2 flex flex-col gap-2 text-gray-800'>
                    <li>{`👉🏼 Always include Your Trigger word in the Prompt`}</li>
                    <li>{`👉🏼 when describing People always be specific of gender identity(man/woman)`}</li>
                    <li>{`👉🏼 Use "[trigger word]+gender" instead of pronouns`}</li>
                </ul>
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Example:</h3>
            <div className="space-y-2  text-sm">
                
              <div className="flex items-center gap-2">
                <span className="text-red-500">❌</span>
                <span className="text-gray-500">"He is sitting at the bar"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-900">"SEMU man is sitting at the bar"</span>
              </div>
              <p>{`For the image shown on the right, the prompt uses the trigger word 'SEMU' together with the gender, referring to 'SEMU man' instead of using generic terms like 'he'.`} </p>
            </div>
          </div>

            </div>
            <div className='max-w-[230px] mx-3 flex flex-col gap-4 h-max mt-6'>
                <div className='h-[230px] w-[230px]'>
                <img src={promptOutput} alt="output of the below prompt" 
                    className='w-full h-full object-contain rounded-md'
                />
                </div>
               
                <div>
                    <p className='text-sm'>
                        <span className='font-bold'>{"Prompt: "}</span>generate image of SEMU man sitting at the 80s bar SEMU man is wearing a hat, SEMU man drinking a whisky sitting next to a card table.
                    </p>
                </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PromptDescription;
