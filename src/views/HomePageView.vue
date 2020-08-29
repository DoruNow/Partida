<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cards-club</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="goTo('')">Licitatii</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cards-club</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="goTo('player')"
              >Go To Player Route</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cards-club</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="goTo('table/testRoom')"
              >Go To Table Route</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cards-club</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Coming soon</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Partida</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row class="d-flex align-center justify-center">
          <!-- TODO change to placeholder so main menu makes sense -->
          <LicitatiiComponent />
        </v-row>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LicitatiiComponent from "@/components/LicitatiiComponent.vue";

@Component({
  components: { LicitatiiComponent },
})
export default class HomePageView extends Vue {
  drawer = null;

  created(): void {
    // @ts-ignore
    this.$vuetify.theme.dark = true;
  }

  goTo(arg: string): void {
    if (this.$route.path !== `/${arg}`) {
      this.$router.push(`/${arg}`);
    }
  }
}
</script>
