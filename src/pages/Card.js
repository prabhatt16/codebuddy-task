function Card({ image, firstName, lastName, discription }) {
  return (
    <div className="containerOfCard">
      <div className="cardHeader">
        <img
          src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=1060&t=st=1682097851~exp=1682098451~hmac=979defd3f4fd0e95306e16a88729e04c39ac92386ee3017f997b4c15865685de"
          alt="logo"
          style={{ width: '40px', height: '40px', borderRadius: '100%', marginRight: '12px' }}
        />
        <h4>{`${firstName}  ${lastName}`}</h4>
      </div>
      <div className="cardBody">
        <p>{discription}</p>
        <img src={image} alt="mainImage" className="mainImge" />
      </div>
    </div>
  );
}

export default Card;
