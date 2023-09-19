import ServiceComponent from '../components/ServiceComponent'
function HomeScreen() {
  return (
    <div>
      <h1>Welcome!</h1>
      <ServiceComponent onClick={undefined} title={'tkt'} color={'yellow'}></ServiceComponent>
      <ServiceComponent onClick={undefined} title={'mon'} color={'red'}></ServiceComponent>
      <ServiceComponent onClick={(event: any) => console.log('zebi')} title={'gars'} color={'green'}></ServiceComponent>
    </div>
  )
}

export default HomeScreen;
