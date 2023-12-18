import phoneIcone from  "../../assets/phone-icon.svg"
import shoesIcon from "../../assets/shoes-icon.svg"
import bottleIcon from "../../assets/bottle-icon.svg"
import fruitIcon from "../../assets/fruit-icon.svg"
import "./index.css"

const KeyFeature = () => {
    return (
        <>
            <div className="feature-container">
                <div className="feature-box">
                    <div className="feature-content">
                        <img className="feature-image" src={phoneIcone} alt="phone icon" />
                        <p className="feature-text">Seamlessly track your health with our intuitive and user-friendly UI</p>
                    </div>
                </div>
                <div className="feature-box">
                    <div className="feature-content">
                        <img className="feature-image" src={shoesIcon} alt="shoes icon" />
                        <p className="feature-text">Monitor your daily steps effortlessly, ensuring you stay on track with your fitness goals.</p>
                    </div>
                </div>
                <div className="feature-box">
                    <div className="feature-content">
                        <img className="feature-image" src={bottleIcon} alt="bottle icon" />
                        <p className="feature-text">Easily stay hydrated using our intuitive water intake tracker.</p>
                    </div>
                </div>
                <div className="feature-box">
                    <div className="feature-content">
                        <img className="feature-image" src={fruitIcon} alt="fruit icon" />
                        <p className="feature-text">Track your calories intake, making it easy to choose the best method for your diet and overall well-being.</p>
                    </div>
                </div>
            </div>
        </>
    )
  };
  
  export default KeyFeature;