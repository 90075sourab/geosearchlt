const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'openstreetmap',
   /*
    // Optional depending on the providers
    fetch: customFetchImplementation,
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
    */
  };
   
const geocoder = NodeGeocoder(options);
fun=async ()=>{
  // Using callback
   
  const res = await geocoder.reverse({ lat: 22.577151999999998, lon: 88.3720192 });
  console.log(res);
}
fun();