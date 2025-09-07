<script>
import WeeklyCalendar from "../components/weekly-calendar.component.vue";
import ReservationToolbar from "../components/reservation-toolbar.component.vue";
import {SpaceReservationService} from "../services/space-reservation.service.js";
import {SharedAreaService} from "../../shared/services/shared-area.service.js";
import {SharedArea} from "../../shared/model/shared-area.entity.js";
import {Reservation} from "../model/reservation.entity.js";
import {mapGetters} from "vuex";

export default {
  name: "reservation-management",
  components: {ReservationToolbar, WeeklyCalendar},
  data() {
    return {
      areas: [],
      events: [],
      areaId: null,
      userId: null,
      userRole: null,
      reservationService: null,
      sharedAreaService: null,
      loading: true
    }
  },
  computed: {
    ...mapGetters('user', ['userId', 'userRole'])
  },
  methods: {

    //#region EventHandlers


    onSharedSpaceSelected(item) {
      this.areaId = item.id;
      this.getReservationsByAreaId(this.areaId);
      console.log(this.areaId)
    },


    //#endregion

    //#region Action Methods

    getSharedAreas() {
      this.sharedAreaService.getAll().then(response => {
        this.areas = response.data.map(area => new SharedArea(area))
        console.log(this.areas);
        this.loading = false;
      }).catch(error => {
        console.error(error)
        this.loading = false;
      });
    },

    getReservationsByAreaId(areaId) {
      this.reservationService.findAllByAreaId(areaId).then(response => {
        this.events = response.data.map(reservation => new Reservation(reservation))
        console.log('response', response.data)
        console.log('reservations response objects', this.events);
      })
    },

    createReservation(reservation) {
      this.reservationService.create(reservation).then(response => {
        console.log('reservation created', response.data);
        const newReservation = new Reservation(response.data);
        this.events.push(newReservation);
      })
    }

    //#endregion
  },
  created() {
    //destructure userId and userRole from the store in computed properties
    const {userId, userRole} = this;

    this.reservationService = new SpaceReservationService();
    this.sharedAreaService = new SharedAreaService();

    this.userId = userId;
    this.userRole = userRole;

    this.getSharedAreas();
  }
}
</script>

<template>
  <div v-if="loading">
    Loading shared areas...
  </div>
  <div v-else>
    <reservation-toolbar
        :sharedAreas="areas"
        :areaId="areaId"

        v-on:shared-space-selected="onSharedSpaceSelected($event)"
    />
    <weekly-calendar :events="events"
                     :areaId="areaId"
                     :userId="userId"
    />
  </div>
</template>

<style scoped>

</style>