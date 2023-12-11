import "./index.css"
import background from "../../assets/about-us-background.svg"

const AboutUs = () => {
  return (
    <>
      <img className="background" src={background} alt="about us background" />
      <div className="container">
        <h2 className="header">About Us</h2>
        <p className="paragraph">
          Meet Helena, your all-in-one wellness companion. Seamlessly track
          water, calories, steps, and sleep. Engage in mindful meditation and
          monitor your mood for emotional insights. Empowering your journey to a
          healthier, happier life, Helena supports you with informed choices,
          activity, calm moments, and overall well-being. Join us for attainable
          and enjoyable health goals.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
