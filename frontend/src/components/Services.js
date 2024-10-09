import ProgramImage1 from "../assets/images/futsal1.jpg";
import ProgramImage2 from "../assets/images/gymn.jpg";
import ProgramImage3 from "../assets/images/swimming.jpg";

const Program = () => {
  return (
    <section class="program container" id="program">
      <h3 class="section-title">OUR SERVICES</h3>
      <span class="section-subtitle">Futsal, Gymn and Swimming pool</span>
      <div class="row program-row">
        <div class="col program-card">
          <a href="/Futsal">
            <img class="program-card-image" src={ProgramImage1} alt="" />
            <h4 class="card-title">
              <button class="newsletter-button">Futsal</button>
            </h4>
            <p class="card-description">
              Want to enjoy futsal with friends then Book your favourite futsal
              easily
            </p>
          </a>
        </div>

        <div class="col program-card">
          <a href="/Gym">
            <img class="program-card-image" src={ProgramImage2} alt="" />
            <h4 class="card-title">
              <button class="newsletter-button">Gym</button>
            </h4>
            <p class="card-description">
              Wanna built muscles choose the best gymn around city esily
            </p>
          </a>
        </div>

        <div class="col program-card">
          <a href="/Swimming">
            <img class="program-card-image" src={ProgramImage3} alt="" />
            <h4 class="card-title">
              <button class="newsletter-button">Swimming</button>
            </h4>
            <p class="card-description">
              Book swimming classes and join for memebership
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Program;
