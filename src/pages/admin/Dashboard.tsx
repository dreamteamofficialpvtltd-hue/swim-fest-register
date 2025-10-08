import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Registration } from '@/types';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  LogOut, 
  Search,
  Download,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

type AdminRegistration = Partial<Registration> & { id: string };

const Dashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<AdminRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'attended'>('all');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchRegistrations();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchRegistrations = async () => {
    try {
      const q = query(
        collection(db, 'registrations'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as any),
        id: doc.id,
      })) as AdminRegistration[];
      
      setRegistrations(data);
      setFilteredRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = registrations;

    // Apply filter
    if (filter === 'paid') {
      filtered = filtered.filter(r => r.paymentStatus === 'paid');
    } else if (filter === 'pending') {
      filtered = filtered.filter(r => r.paymentStatus === 'pending' || r.paymentStatus === 'awaiting_verification');
    } else if (filter === 'attended') {
      filtered = filtered.filter(r => r.attended);
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(r => 
        (r.studentName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.regID ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.phone ?? '').includes(searchQuery)
      );
    }

    setFilteredRegistrations(filtered);
  }, [filter, searchQuery, registrations]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Registration ID',
      'Student Name',
      'Father Name',
      'Phone',
      'Email',
      'Age Group',
      'Events',
      'Total Amount',
      'Payment Status',
      'Attended',
      'Created At'
    ];

    const rows = filteredRegistrations.map(r => [
      r.regID ?? r.id,
      r.studentName ?? '',
      r.fatherName ?? '',
      r.phone ?? '',
      r.email ?? '',
      r.ageGroup ?? '',
      (r.selectedEvents ?? []).join('; '),
      r.totalAmount ?? '',
      r.paymentStatus ?? '',
      r.attended ? 'Yes' : 'No',
      String(r.createdAt ?? '')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const stats = {
    total: registrations.length,
    paid: registrations.filter(r => r.paymentStatus === 'paid').length,
    pending: registrations.filter(r => r.paymentStatus === 'pending' || r.paymentStatus === 'awaiting_verification').length,
    attended: registrations.filter(r => r.attended).length,
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'awaiting_verification': return 'bg-blue-500 text-white';
      default: return 'bg-destructive text-destructive-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <header className="bg-primary text-primary-foreground shadow-custom-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-90">Swim Fest Registration Management</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Paid</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{stats.paid}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Attended</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.attended}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, phone, or registration ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registrations List */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All ({registrations.length})</TabsTrigger>
                <TabsTrigger value="paid">Paid ({stats.paid})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
                <TabsTrigger value="attended">Attended ({stats.attended})</TabsTrigger>
              </TabsList>

              <div className="space-y-3">
                {filteredRegistrations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No registrations found
                  </div>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <Card key={reg.regID} className="hover:shadow-custom-md transition-smooth">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{reg.studentName}</h3>
                              <Badge className={getPaymentStatusColor(reg.paymentStatus)}>
                                {reg.paymentStatus}
                              </Badge>
                              {reg.attended && (
                                <Badge className="bg-primary">Attended</Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>Reg ID: {reg.regID}</p>
                              <p>Phone: {reg.phone}</p>
                              <p>Age Group: {reg.ageGroup} | Events: {reg.selectedEvents.length}</p>
                              <p>Amount: ₹{reg.totalAmount}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/admin/registration/${reg.regID}`)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
