'use server'

import prisma from '@/src/lib/prisma'
import UpdateAtomsWithPrisma from './components/UpdateAtomsWithPrisma'
import TextSection from './components/TextSection'
import ButtonSection from './components/ButtonSection'
import MediaSection from './components/MediaSection'

type CutsceneProps = {
  name: string
  language: string
}

const Cutscene = async ({ name, language }: CutsceneProps) => {
  console.log('Cutscene Rendered!')

  const cutsceneImagesData = await prisma.cutscene.findFirst({
    where: {
      name: name,
      language: language,
    },
    select: {
      images: {
        select: {
          path: true,
          stage: true,
        },
      },
    },
  })

  const cutsceneVideosData = await prisma.cutscene.findFirst({
    where: {
      name: name,
      language: language,
    },
    select: {
      videos: {
        select: {
          path: true,
          stage: true,
        },
      },
    },
  })

  const cutsceneTextsData = await prisma.cutscene.findFirst({
    where: {
      name: name,
      language: language,
    },
    select: {
      texts: {
        select: {
          value: true,
          stage: true,
        },
      },
    },
  })

  return (
    <div className="absolute z-50 h-full w-full overflow-y-auto bg-[black] py-10">
      <UpdateAtomsWithPrisma
        cutsceneImagesData={cutsceneImagesData}
        cutsceneVideosData={cutsceneVideosData}
        cutsceneTextsData={cutsceneTextsData}
      >
        <main className="flex h-full w-full flex-col items-center gap-4">
          <MediaSection />
          <TextSection />
          <ButtonSection />
        </main>
      </UpdateAtomsWithPrisma>
    </div>
  )
}

export default Cutscene
