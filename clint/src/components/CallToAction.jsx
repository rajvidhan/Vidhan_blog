import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl text-center rounded-br-3xl '>
      <div className='flex-1 justify-center flex flex-col'>
    <h2 className='text-2xl'>Want to learn about coding</h2>
    <p className='text-gray-500 my-2'>Checkout these resources 100 methds to become a coder.</p>
    <Button className='rounded-tl-xl rounded-bl-null' gradientDuoTone={"purpleToPink"}>
 <a href="https://dev.to/emmabostian/101-tips-for-being-a-great-programmer-human-36nl" target='_blank' rel='noopener noreferrer'>Learn More</a>
    </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src="https://media.istockphoto.com/id/183239064/photo/indian-laptop-man.jpg?s=612x612&w=0&k=20&c=zcxlsiNQKZeddgtCeymL8cD_gQ8JudbfF7tvfGLFNJg="  />
      </div>
    </div>
  )
}

export default CallToAction
