import ServiceComponent from '../components/ServiceComponent'
function HomeScreen() {
  const clickHandler = (e: MouseEvent): void => {
    e.preventDefault();
    alert(`Clicked at ${e.pageX} ${e.pageY}`);
  }
  return (
    <div>
      <ServiceComponent onClick={undefined} title={'tkt'} color={'yellow'}></ServiceComponent>
      <ServiceComponent onClick={undefined} title={'mon'} color={'red'}></ServiceComponent>
      <ServiceComponent onClick={(event: any) => console.log('zebi')} title={'gars'} color={'green'}></ServiceComponent>
    </div>
  )
}

export default HomeScreen;
