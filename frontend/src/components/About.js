import AboutImage from "../assets/images/about.jpg";

const About = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));         
  return (
    <section class="about container" id="about">
      <div class="about-wrapper">
        <img class="about-image" src={AboutImage} alt="" /> 
        <div class="about-data">
          <h3 class="about-title">STORY ABOUT US</h3>
          <p class="about-description">
            KhelCenter is a platform that allows users to reserve and schedule
            their desired activities such as futsal games, gym sessions, or
            swimming sessions. The site provides the convenience of online
            booking, eliminating the need for manual reservation or phone calls.
            It also helps to streamline the booking process, making it easier
            for users to plan and organize their activities.
          </p>

          {user ? (
            <>
              <a href="#read-more" class="about-btn">
                READ MORE
              </a>
            </>
          ) : (
            <>
              <a style={{ marginRight: '2.5rem' }} href="http://localhost:3000/BusinessScreen" class="about-btn">
                Register your business
              </a>

              <a href="http://localhost:3000/LoginBusinessScreen" class="about-btn">
                Login to admin panel
              </a>

            </>
          )}

        </div>
      </div>
    </section>
  );
};

export default About;
