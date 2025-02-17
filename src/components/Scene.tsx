"use client"

import {useEffect, useRef} from "react"
import {Canvas, useFrame} from "@react-three/fiber"
import {ScrollControls, useAnimations, Html, useGLTF, useScroll} from "@react-three/drei"

import Hero from "@/components/Hero"
import FeaturedCourses from "@/components/FeaturedCourses"
import WhyChooseUs from "@/components/WhyChooseUs"
import TestimonialCard from "@/components/TestimonialCard"
import UpcomingWebinar from "../components/UpcomingWebinar"
import Instructor from "@/components/Instructor"

let Index = () => {
  const scroll = useScroll()
  let background = useGLTF("/robot_playground.glb")
  let {actions} = useAnimations(background.animations, background.scene)

  const mesh: any = useRef(null)

  useEffect(() => {
    //@ts-ignore
    actions["Experiment"].play().paused = true
  }, [])

  useFrame(
    () =>
      //@ts-ignore
      (actions["Experiment"].time =
        //@ts-ignore
        (actions["Experiment"].getClip().duration * scroll.offset) / 1),
  )

  return (
    <group ref={mesh}>
      <primitive object={background.scene} />
      <Html>
        <div className='absolute left-0 top-0 -translate-x-1/2 -translate-y-60'>
          <section style={{width: "1300px"}}>
            <Hero />
          </section>
          <section style={{width: "1300px"}}>
            <FeaturedCourses />
          </section>
          <section className='Up' style={{width: "1300px"}}>
            <WhyChooseUs />
          </section>
          <section style={{width: "1300px"}}>
            <TestimonialCard />
          </section>
          <section style={{width: "1300px"}}>
            <UpcomingWebinar />
          </section>
          <section style={{width: "1300px"}}>
            <Instructor />
          </section>
        </div>
      </Html>
    </group>
  )
}

export default function Home() {
  return (
    <Canvas>
      <directionalLight position={[-5, -5, 5]} intensity={4} />
      <ambientLight />
      <ScrollControls damping={0.5} pages={5}>
        <Index />
      </ScrollControls>
    </Canvas>
  )
}
