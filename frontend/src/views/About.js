import Header from '../components/Header';
import VD from '../assets/graphics/vd.png'
import Footer from '../components/Footer'
function About() {
  return (
    <div className='about'>
      <Header />
      <div className='info'>
      <h1>Vårt Kaffe</h1>
      <p className='second'>Pumpkin spice mug, barista cup, sit macchiato, kopi-luwak, doppio, grounds dripper, crema, strong whipped, variety extra iced id lungo half and half mazagran. Pumpkin spice.</p>
<br></br>
<p>Que dark fair trade, spoon decaffeinated, barista wings whipped, as rich aftertaste, con panna milk black, arabica white rich beans single shot extra affogato. So affogato macchiato sit extraction instant grinder seasonal organic, turkish single shot, single origin, and robusta strong to go so dripper. Viennese froth, grounds caramelization skinny aromatic cup kopi-luwak, fair trade flavour, frappuccino medium, café au lait flavour cultivar ut bar instant kopi-luwak.</p>
<br></br>
<p>Roast id macchiato, single shot siphon mazagran milk fair trade est aroma a half and half and, so, galão iced to go, whipped as cream cup pumpkin spice iced. At extra, rich grinder, brewed to go, steamed half and half at, that, percolator macchiato trifecta and body as arabica dripper. In galão black java milk sit trifecta, robusta, acerbic café au lait instant shop latte. Seasonal bar shop filter aroma id, crema, affogato viennese cultivar aftertaste, seasonal, percolator cream black, galão flavour, milk aromatic turkish skinny crema.
        </p>
      </div>
      <div className='founder'>
      <img src={VD} alt='vd'></img>
      <h2>Eva Cortado</h2>
        <p>VD och grundare</p>
      </div>
      <Footer></Footer>
      </div>
     
  )
}
export default About