export default function ConfirmationModal({
  text,
  isOpen,
  handleClose,
  handleSubmit,
}) {
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 overflow-y-auto flex items-center justify-center min-h-screen"
          onClick={handleClose}
          style={{ zIndex: 9999 }}
        >
          <div className="absolute inset-0 bg-black opacity-75" />

          <div
            className=" bg-white overflow-hidden shadow-xl transform transition-all z-50  p-12 rounded-2xl flex flex-col items-center justify-center gap-2 text-center relative"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeIn", duration: 0.15 }}
          >
            <div className="flex w-full justify-end absolute top-7 right-5">
              <div
                key="menu toggle button"
                className="flex relative h-8 z-50 justify-center items-center group inverse-hover pr-3 w-fit cursor-pointer hover:scale-110 transform duration-150"
                onClick={handleClose}
                style={{ filter: isOpen ? "invert(1)" : "" }}
              >
                X
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-black mb-4">
              {text.action}
            </h3>
            <p className="text-lg font-light text-black lg:whitespace-nowrap">
              {text.top}
            </p>
            <p className="text-lg font-light text-black mb-5 lg:whitespace-nowrap">
              {text.bottom}
            </p>
            <button
              onClick={handleSubmit}
              disabled={false}
              className="rounded-2xl h-11 px-7 flex items-center justify-center text-black hover:text-white font-extrabold text-sm border border-black border-opacity-30 hover:bg-black relative group"
            >
              {text.action}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
