const moment = require('moment/moment')
const meds = require('../models/meds')
const { getAllStores } = require('./store.service')

const CronJob = require('cron').CronJob
module.exports.notificationJob = new CronJob(
  '0 0 * * * *',
  async function () {
    console.log('You will see this message every second')
    const stores = await getAllStores()
    for (let index = 0; index < stores.length; index++) {
      const store = stores[index]
      const medicines = await module.exports.getMedicines({
        storeId: store._id,
        expDate: {
          $gte: moment.utc().startOf("day").toISOString(),
          $lt: moment.utc().add(1, "month").toISOString()
        }
      })
      medicines.map(async (med) => {

        if(med.quantityAvailable <= med.quantityThreshhold) {
            console.log("LOW QUANTITY FOR", med.name, "FOR", store.name)
        }

      })
    }
  },
  null,
  true,
  'America/Los_Angeles'
)

module.exports.getMedicines = async (
  condition,
  projection = { __v: false }
) => {
  try {
    return await meds.find(condition, projection)
  } catch (error) {
    errorLog('Error occured while retriving medicines.' + error)
  }
}
