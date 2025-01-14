import { EmojiProvider, Emoji } from 'react-apple-emojis'

import emojiData from "react-apple-emojis/src/data.json"

export default function HiSection() {
  const hiBinary = '01101000 01101001 00100001.'.split(' ')
  
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-3">
        <h2 className="text-6xl font-bold mb-8 relative z-10">
          {hiBinary.map((byte, index) => (
            <div key={index} className="mb-2">
              {byte}
            </div>
          ))}
          <p className="text-lg mt-12 font-normal">
            <EmojiProvider data={emojiData}><Emoji name="waving-hand" className="inline" width={20} /></EmojiProvider> "Hi!" In Binary!
          </p>
        </h2>
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <div className="w-64 h-64 rounded-full bg-[#390099] blur-3xl" />
        <div className="w-64 h-64 rounded-full bg-[#9E0059] blur-3xl -ml-32" />
        <div className="w-64 h-64 rounded-full bg-[#FF0054] blur-3xl -ml-32" />
      </div>
    </section>
  )
}

