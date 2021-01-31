<template>
    <div id="right" :class="{ open: this.$store.state.right_open }">
        <div id="right-slim">
            <div class="rightsidebar-right">
                <b-tabs ref="tabs" card>
                    <b-tab  active>
                        <template slot="title">
                            <i class='fa fa-user-o text-success'></i>
                        </template>
                            <div id="slim_t1">
                                <div>
                                    <h5 class="rightsidebar-right-heading text-uppercase text-white bg-success text-xs">
                                        Contacts
                                    </h5>
                                    <ul class="list-unstyled margin-none">
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar6.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-primary"></i> Annette
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-primary"></i> Jordan
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar2.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-primary"></i> Stewart
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar3.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-warning"></i> Alfred
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar4.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-danger"></i> Eileen
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar5.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-muted"></i> Robert
                                            </a>
                                        </li>
                                        <li class="rightsidebar-contact-wrapper">
                                            <a class="rightsidebar-contact" href="javascript:void(0)">
                                                <img :src='require("../../assets/img/authors/avatar7.jpg")' class="rounded-circle float-right" alt="avatar-image">
                                                <i class="fa fa-circle text-xs text-muted"></i> Cassandra
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                    </b-tab>
                    <b-tab>
                        <template slot="title">
                            <i class='fa fa-upload text-danger' aria-hidden='true'></i>
                        </template>
                        <div id="slim_t2">
                            <div>
                        <h5 class="rightsidebar-right-heading text-uppercase text-xs bg-danger text-white">
                            Recent Updates
                        </h5>
                        <div>
                            <ul class="list-unstyled ">
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-comments-smiley fa-fw text-primary"></i> New Comment
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-twitter-alt fa-fw text-success"></i> 3 New Followers
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-email fa-fw text-info"></i> Message Sent
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-write fa-fw text-warning"></i> New Task
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-export fa-fw text-danger"></i> Server Rebooted
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-info-alt fa-fw text-primary"></i> Server Not Responding
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-shopping-cart fa-fw text-success"></i> New Order Placed
                                    </a>
                                </li>
                                <li class="rightsidebar-notification rightsidebar-contact-wrapper">
                                    <a class="rightsidebar-contact" href="javascript:void(0)">
                                        <i class="fa ti-money fa-fw text-info"></i> Payment Received
                                    </a>
                                </li>
                            </ul>
                        </div>
                            </div>
                        </div>


                    </b-tab>
                </b-tabs>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "right_side_bar",
    mounted: function() {

    },
    destroyed: function() {

    },
    methods: {
        change_skin() {
        }
    }
}
</script>

