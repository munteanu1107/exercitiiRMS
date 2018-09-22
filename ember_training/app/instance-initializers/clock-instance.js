export function initialize(applicationInstance) {
  let serviceData = applicationInstance.lookup('service:clock-data');
  let serviceDataDefault = applicationInstance.lookup('service:default-data');

  var retrivedDefaultData = serviceDataDefault.getDefaultData();
  serviceData.setDefaultClock(retrivedDefaultData);
}

export default {
  initialize
};
