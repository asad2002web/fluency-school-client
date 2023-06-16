import React from 'react'
import Bunner from '../Bunner/Bunner'
import PopularClass from '../PopularClass'
import PopularInstructor from '../PopularInstructor'
import ExtraSection from './ExtraSection'

const Home = () => {
  return (
    <div>
        <Bunner></Bunner>
        <PopularClass></PopularClass>
        <PopularInstructor></PopularInstructor>
        <ExtraSection></ExtraSection>
    </div>
  )
}

export default Home