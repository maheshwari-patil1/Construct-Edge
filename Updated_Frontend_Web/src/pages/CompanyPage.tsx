import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { company } from "@/lib/mockData";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCompanyStatsApi } from "@/services/api";

/* ---------------- ANIMATION ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CompanyPage() {
  /* ✅ HOOKS MUST BE INSIDE COMPONENT */
  const [companyStats, setCompanyStats] = useState<any>(null);

  useEffect(() => {
    async function loadCompanyStats() {
      try {
        const res = await getCompanyStatsApi();
        setCompanyStats(res.data);
      } catch (err) {
        console.error("Failed to load company stats", err);
      }
    }
    loadCompanyStats();
  }, []);

  return (
    <AppLayout>
      <motion.div initial="hidden" animate="visible" className="space-y-8">
        {/* ================= HEADER ================= */}
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold">Company</h1>
          <p className="text-muted-foreground mt-1">
            Overview of company details and organization profile
          </p>
        </motion.div>

        {/* ================= HERO CARD ================= */}
        <motion.div variants={fadeUp}>
          <Card className="bg-gradient-to-r from-orange-50 to-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-orange-500">
                  <Building2 className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{company.name}</CardTitle>
                  <CardDescription>
                    Trusted construction & infrastructure partner
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground max-w-3xl">
                {company.description}
              </p>

              {/* ================= QUICK STATS ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Users className="text-orange-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Employees</p>
                    <p className="font-semibold">
                      {companyStats?.employees ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Briefcase className="text-orange-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Active Projects
                    </p>
                    <p className="font-semibold">
                      {companyStats?.activeProjects ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Calendar className="text-orange-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Established</p>
                    <p className="font-semibold">{company.established}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ================= DETAILS GRID ================= */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* CONTACT INFO */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How clients can reach your company
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{company.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{company.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{company.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ONLINE PRESENCE */}
          <Card>
            <CardHeader>
              <CardTitle>Online Presence</CardTitle>
              <CardDescription>Company website & visibility</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Globe className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Website</p>
                  <a
                    href="https://constructedge.example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-orange-600 hover:underline"
                  >
                    https://constructedge.example
                  </a>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline">Construction</Badge>
                <Badge variant="outline">Infrastructure</Badge>
                <Badge variant="outline">Engineering</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
