const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-400 py-6 mt-16">
  <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
    <span className="text-sm">
      © {new Date().getFullYear()} GamesLib. All rights reserved.
    </span>
    <span className="text-xs text-yellow-400">
      Made by Eris Sutkovic
    </span>
    <span className="text-xs text-yellow-400">
      CortexAcademy - React ca25
    </span>
  </div>
</footer>
  )
}

export default Footer