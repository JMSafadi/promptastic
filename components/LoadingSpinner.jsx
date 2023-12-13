import { PropagateLoader } from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className="mt-20">
      <PropagateLoader  color="#EB5D0C" size={20} speedMultiplier={1}/>
    </div>
  )
}

export default LoadingSpinner