export function initialize(application) {
  application.inject('route', 'clockDataDefault', 'service:default-data');
  application.inject('route', 'clockData', 'service:clock-data');
  application.inject('route', 'tooltipManager', 'service:tooltip-manager');
}

export default {
  initialize
};
