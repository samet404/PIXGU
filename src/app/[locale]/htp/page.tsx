import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '400', '300'],
})

const HowToPlay = () => {
  return (
    <article
      style={{
        scrollbarWidth: 'none',
      }}
      className={`${outfit.className} xxl:w-full flex h-full flex-col items-center gap-8 overflow-y-scroll p-5 pt-[5rem] text-center font-[700] text-white `}
    >
      <section className="igap-3 tems-start flex flex-col rounded-lg border-[0.2rem] border-[#ffffff69] bg-gradient-to-tr from-sky-600 to-sky-400 text-start xxs:w-full xxs:p-4 md:p-7 lg:w-[50rem]">
        <h5 className="pb-2">
          {`Welcome to PIXGU, drawing and guessing game! Here's everything you
          need to know to get started:`}
        </h5>

        <div className="flex flex-col gap-7 rounded-md bg-[#00000028] p-2">
          <div>
            <h2># Basics</h2>

            <div className="flex flex-col gap-1">
              <div>
                <h5>Joining a room</h5>
                <p className="font-[400] leading-5">{`To join a room, search for it by name or ID, or create a new one. As the host of a new room, you can invite other players. With hosting system we aim to add more customization options for rooms!`}</p>
              </div>

              <div>
                <h5>Drawing</h5>
                <p className="font-[400] leading-5">{`When it's your turn, you'll receive a word to draw. You can draw with your mouse or touchscreen`}</p>
              </div>
              <div>
                <h5>Guessing</h5>
                <p className="font-[400] leading-5">{`When others are drawing, type your guesses in the chat.`}</p>
              </div>
              <div>
                <h5>Coins</h5>
                <p className="font-[400] leading-5">{`The faster you guess correctly vice versa, the more coins you earn. Coin increases your place in the leaderboard. Also you can buy power-ups and unlock new features.`}</p>
              </div>
            </div>
          </div>

          <div>
            <h2># Power-ups</h2>

            <div className="flex flex-col gap-1">
              <div>
                <h5>Extend time</h5>
                <p className="font-[400] leading-5">{`
                  Gives you extra seconds for drawing or guessing.
                `}</p>
              </div>

              <div>
                <h5>Unlock letter</h5>
                <p className="font-[400] leading-5">{`Reveals a letter of the word when guessing.`}</p>
              </div>
              <div>
                <h5>Mystery box</h5>
                <p className="font-[400] leading-5">{`Reveals a power-up.`}</p>
              </div>
              <div>
                <h5>AI</h5>
                <p className="font-[400] leading-5">{`AI will look your drawing and give you recommendations.`}</p>
              </div>
              <div>
                <h5>New theme</h5>
                <p className="font-[400] leading-5">{`If you don't like themes while selecting, you can change it.`}</p>
              </div>
            </div>
          </div>
          {/* <p>Take Turns: Players alternate between drawing and guessing.</p>
          <p>{`Draw: When it's your turn, you'll receive a word to draw.`}</p>
          <p>Guess: When others are drawing, type your guesses in the chat. </p>
          <p>
           
          </p> */}
        </div>
      </section>
    </article>
  )
}

export default HowToPlay
// ## Speed Scoring System

// *
// * Quick, accurate drawings that others guess rapidly will boost your score.
// * A timer counts down for each round - act fast!

// ## Power-ups

/**
 * - [ ]  Unlock letter
- [ ]  
- [ ]  
- [ ]  
 */
// Enhance your gameplay with power-ups from the marketplace:

// * **Time Boost**: Get extra seconds for drawing or guessing.
// * **Hint Reveal**: Reveal a letter of the word when guessing.
// * **Color Palette**: Unlock additional colors for more detailed drawings.
// * **Brush Size**: Access different brush sizes for precision or speed.

// To use power-ups:
// 1. Visit the in-game marketplace
// 2. Purchase power-ups with in-game currency or real money
// 3. Activate them during gameplay for an advantage

// Remember, practice makes perfect! The more you play, the better you'll become at quick drawing and guessing. Good luck and have fun!
