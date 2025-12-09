import React, { useState, useEffect } from 'react';
import { SERVICES, INITIAL_QUEUE_STATUS } from './constants';
import { ServiceDefinition, Ticket, ViewState, User } from './types';
import ServiceCard from './components/ServiceCard';
import TicketView from './components/TicketView';
import AssistantView from './components/AssistantView';
import Navigation from './components/Navigation';
import Icon from './components/Icon';
import LoginView from './components/LoginView';
import BookingView from './components/BookingView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('login');
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceDefinition | null>(null);
  
  // Simulation State: Current number being called (Just for dashboard visuals)
  const [queueStatus, setQueueStatus] = useState<Record<string, number>>(INITIAL_QUEUE_STATUS);

  // Simulate queue movement every 10 seconds (visual sugar only)
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus(prev => {
        const next = { ...prev };
        const keys = Object.keys(next);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        next[randomKey] += 1;
        return next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle Login
  const handleLogin = (userData: User) => {
      setUser(userData);
      setView('home');
  };

  const handleSelectService = (service: ServiceDefinition) => {
    setSelectedService(service);
    setView('booking');
  };

  const handleConfirmBooking = (date: string, timeSlot: string) => {
    if (!selectedService) return;

    // Generate Booking Code
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const bookingCode = `${selectedService.code}${randomNum}-${date.slice(8)}`;

    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService.id,
      number: bookingCode,
      date: date,
      timeSlot: timeSlot,
      timestamp: Date.now(),
      status: 'booked',
    };

    setActiveTicket(newTicket);
    setView('ticket');
    setSelectedService(null);
  };

  const handleCancelTicket = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan jadwal reservasi ini?')) {
      setActiveTicket(null);
      setView('home');
    }
  };

  // Main Render Switch
  const renderContent = () => {
    if (view === 'login') {
        return <LoginView onLoginSuccess={handleLogin} />;
    }

    if (view === 'booking' && selectedService) {
        return (
            <BookingView 
                service={selectedService} 
                onConfirm={handleConfirmBooking} 
                onBack={() => setView('home')} 
            />
        );
    }

    switch (view) {
      case 'home':
        return (
          <div className="pb-24">
            {/* Header */}
            <header className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 pt-12 pb-20 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-5"></div>

              <div className="flex justify-between items-center text-white mb-6 relative z-10">
                 <div className="flex items-center space-x-3">
                    {user?.avatar && (
                        <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white/30" />
                    )}
                    <div>
                        <p className="text-blue-200 text-xs">Selamat Datang,</p>
                        <h1 className="text-lg font-bold truncate max-w-[150px]">{user?.name || 'Tamu'}</h1>
                    </div>
                 </div>
                 <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                    <Icon name="Bell" size={20} className="text-white" />
                 </div>
              </div>

              {/* Status Summary */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-white relative z-10">
                 <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-blue-200 mb-1">Status Operasional</p>
                        <div className="flex items-center space-x-2">
                            <div className="bg-green-400 w-2 h-2 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium">Buka • 08:00 - 15:00 WIB</p>
                        </div>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-blue-200 mb-1">Total Antrian</p>
                         <p className="text-xl font-bold">142</p>
                    </div>
                 </div>
              </div>
            </header>

            {/* Service Grid */}
            <div className="px-4 -mt-10 relative z-20 space-y-5">
              
              {/* Active Ticket Banner (Mini) */}
              {activeTicket && (
                  <button 
                    onClick={() => setView('ticket')}
                    className="w-full bg-white p-4 rounded-xl shadow-lg border-l-4 border-green-500 flex items-center justify-between group"
                  >
                      <div>
                          <p className="text-xs text-gray-500">Tiket Aktif</p>
                          <p className="font-bold text-gray-800">{activeTicket.number}</p>
                          <p className="text-xs text-green-600">{activeTicket.timeSlot}</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                  </button>
              )}

              <div>
                <h2 className="font-bold text-gray-800 text-lg px-1 mb-3">Layanan Tersedia</h2>
                <div className="grid grid-cols-1 gap-3">
                    {SERVICES.map((service) => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        onClick={handleSelectService}
                        currentQueueLength={Math.floor(Math.random() * 10) + 1} // Mock queue length
                    />
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'ticket':
        if (!activeTicket) {
           // Prevent viewing empty ticket page, redirect home
           setTimeout(() => setView('home'), 0);
           return null;
        }
        const service = SERVICES.find(s => s.id === activeTicket.serviceId);
        if (!service) return null;

        return (
          <TicketView 
            ticket={activeTicket}
            service={service}
            onCancel={handleCancelTicket}
            userName={user?.name || 'Pengguna'}
          />
        );

      case 'assistant':
        return <AssistantView />;

      default:
        return <div>Halaman tidak ditemukan</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      {renderContent()}
      
      {/* Hide navigation on login or booking page */}
      {view !== 'login' && view !== 'booking' && (
        <Navigation 
            currentView={view} 
            setView={setView} 
            hasActiveTicket={!!activeTicket} 
        />
      )}
    </div>
  );
};

export default App;