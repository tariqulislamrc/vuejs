 <template>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="left-aside sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar -->
        <section class="sidebar">
            <div id="menu" role="navigation">
                <div class="rightsidebar-right">
                    <b-tabs ref="tabs" card>
                        <b-tab title="<i class='ti-comments'></i>" active>
                            <div id="slim_t1">
                                <div>
                                    <h5 class="rightsidebar-right-heading text-uppercase text-xs">
                                        <i class="menu-icon  fa fa-fw ti-user"></i>
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
                                    <h5 class="rightsidebar-right-heading text-uppercase text-xs">
                                        <i class="fa fa-fw ti-export"></i>
                                        Recent Updates
                                    </h5>
                                    <div>
                                        <ul class="list-unstyled">
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-comments-smiley fa-fw text-primary"></i> New Comment
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-twitter-alt fa-fw text-success"></i> 3 New Followers
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-email fa-fw text-info"></i> Message Sent
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-write fa-fw text-warning"></i> New Task
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-export fa-fw text-danger"></i> Server Rebooted
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-info-alt fa-fw text-primary"></i> Server Not Responding
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
                                                    <i class="fa ti-shopping-cart fa-fw text-success"></i> New Order Placed
                                                </a>
                                            </li>
                                            <li class="rightsidebar-notification">
                                                <a href="javascript:void(0)">
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
            <!-- menu -->
        </section>
        <!-- /.sidebar -->
    </aside>
</template>
<script>
export default {
    name: "left-side",
    components: {
    },
    data() {
        return {
        }
    }
}
</script>
