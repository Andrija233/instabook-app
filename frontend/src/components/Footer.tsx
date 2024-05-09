

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          InstaBook
        </span>
        <span className="text-white font-bold tracking-tight gap-4 flex">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms and Conditions</p>
        </span>
      </div>
    </div>
  )
}

export default Footer
