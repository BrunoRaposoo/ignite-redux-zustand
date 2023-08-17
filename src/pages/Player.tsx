import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useEffect } from "react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Player() {
  const { course, load } = useStore(store => {
    return {
      course: store.course,
      load: store.load,
    }
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600 duration-300">
            <MessageCircle className="w-4 h-4" /> 
            Deixe seu feedback
          </button>
        </div>

        <main className="sm:relative flex flex-col sm:flex-col md:flex-col lg:flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-0 sm:pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-full sm:w-80 sm:absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            { course?.modules && course?.modules.map((module, index) => {
              return (
                <Module 
                  key={module.id} 
                  moduleIndex={index} 
                  title={module.title} 
                  amountOfLessons={module.lessons.length} />
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  )
}