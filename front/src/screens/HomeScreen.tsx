import ServiceComponent from '../components/ServiceComponent'
function HomeScreen() {
  const clickHandler = (e: MouseEvent): void => {
    e.preventDefault();
    alert(`Clicked at ${e.pageX} ${e.pageY}`);
  }
  return (
    <div>
      <ServiceComponent onClick={undefined} title={'tkt'} color={''}></ServiceComponent>
      <ServiceComponent onClick={undefined} title={'mon'} color={''}></ServiceComponent>
      <ServiceComponent onClick={(event: any) => console.log('zebi')} title={'gars'} color={''}></ServiceComponent>
    </div>
  )
}

export default HomeScreen;
