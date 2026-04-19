import { useState } from "react";
import {
  ArrowLeft,
  Sun,
  Moon,
  Palette,
  Globe,
  LogOut,
  UserPlus,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslation, Language } from "./translations";

interface SettingsScreenProps {
  onBack: () => void;
  onSignOut: () => void;
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  colorTheme: string;
  onColorThemeChange: (color: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  userType: "kid" | "parent" | null;
}

export function SettingsScreen({
  onBack,
  onSignOut,
  theme,
  onThemeChange,
  colorTheme,
  onColorThemeChange,
  language,
  onLanguageChange,
  userType,
}: SettingsScreenProps) {
  const t = useTranslation(language as Language);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [notifications, setNotifications] = useState(true);

  const colorThemes = [
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
  ];

  const languages = [
    { name: "English", value: "en", flag: "🇺🇸" },
    { name: "Español", value: "es", flag: "🇪🇸" },
    { name: "Français", value: "fr", flag: "🇫🇷" },
    { name: "Deutsch", value: "de", flag: "🇩🇪" },
    { name: "日本語", value: "ja", flag: "🇯🇵" },
    { name: "中文", value: "zh", flag: "🇨🇳" },
    { name: "Português", value: "pt", flag: "🇵🇹" },
    { name: "العربية", value: "ar", flag: "🇸🇦" },
    { name: "한국어", value: "ko", flag: "🇰🇷" },
    { name: "Svenska", value: "sv", flag: "🇸🇪" },
    { name: "Nederlands", value: "nl", flag: "🇳🇱" },
  ];

  const handleAddFriend = () => {
    if (friendUsername.trim()) {
      // In a real app, this would send a friend request
      console.log("Sending friend request to:", friendUsername);
      setFriendUsername("");
      setShowAddFriendDialog(false);
      // Show success toast
      alert(`Friend request sent to ${friendUsername}! 🎉`);
    }
  };

  const handleSignOut = () => {
    setShowSignOutDialog(false);
    onSignOut();
  };

  return (
    <div className="h-full bg-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-primary-foreground">⚙️ {t.settings}</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Appearance Section */}
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h3 className="text-card-foreground mb-4">🎨 {t.appearance}</h3>

          {/* Theme Toggle */}
          <div
            className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors"
            onClick={() => setShowThemeDialog(true)}
          >
            <div className="flex items-center gap-4">
              {theme === "light" ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-blue-400" />
              )}
              <div>
                <p className="text-card-foreground">{t.theme}</p>
                <p className="text-muted-foreground">{theme === "light" ? t.lightMode : t.darkMode}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          {/* Color Theme */}
          <div
            className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors mt-2"
            onClick={() => setShowColorDialog(true)}
          >
            <div className="flex items-center gap-4">
              <Palette className="w-6 h-6 text-primary" />
              <div>
                <p className="text-card-foreground">{t.colorTheme}</p>
                <p className="text-muted-foreground capitalize">{colorTheme}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h3 className="text-card-foreground mb-4">🌍 {t.languageRegion}</h3>

          <div
            className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors"
            onClick={() => setShowLanguageDialog(true)}
          >
            <div className="flex items-center gap-4">
              <Globe className="w-6 h-6 text-primary" />
              <div>
                <p className="text-card-foreground">{t.language}</p>
                <p className="text-muted-foreground">
                  {languages.find((l) => l.value === language)?.name || "English"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Social Section - Only for kids */}
        {userType === "kid" && (
          <div className="bg-card rounded-3xl p-6 shadow-md">
            <h3 className="text-card-foreground mb-4">👥 {t.social}</h3>

            <div
              className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors"
              onClick={() => setShowAddFriendDialog(true)}
            >
              <div className="flex items-center gap-4">
                <UserPlus className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-card-foreground">{t.addFriends}</p>
                  <p className="text-muted-foreground">{t.connectWithLearners}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Notifications Section */}
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h3 className="text-card-foreground mb-4">🔔 {t.notifications}</h3>

          <div className="flex items-center justify-between p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-orange-500" />
              <div>
                <p className="text-card-foreground">{t.pushNotifications}</p>
                <p className="text-muted-foreground">{t.questReminders}</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>

        {/* Privacy & Security Section */}
        {userType === "parent" && (
          <div className="bg-card rounded-3xl p-6 shadow-md">
            <h3 className="text-card-foreground mb-4">🔒 {t.privacySecurity}</h3>

            <div className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <Shield className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-card-foreground">{t.parentalControls}</p>
                  <p className="text-muted-foreground">{t.manageRestrictions}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Help & Support Section */}
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h3 className="text-card-foreground mb-4">❓ {t.helpSupport}</h3>

          <div className="flex items-center justify-between p-6 rounded-2xl hover:bg-muted cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <HelpCircle className="w-6 h-6 text-primary" />
              <div>
                <p className="text-card-foreground">{t.helpCenter}</p>
                <p className="text-muted-foreground">{t.faqsTutorials}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-card rounded-3xl p-6 shadow-md">
          <h3 className="text-card-foreground mb-4">👤 {t.account}</h3>

          <div
            className="flex items-center justify-between p-6 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer transition-colors"
            onClick={() => setShowSignOutDialog(true)}
          >
            <div className="flex items-center gap-4">
              <LogOut className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-red-600">{t.signOut}</p>
                <p className="text-muted-foreground">{t.logOutAccount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-muted-foreground py-4">
          <p>SkillLink v1.0.0</p>
          <p className="mt-2">{t.madeWithLove}</p>
        </div>
      </div>

      {/* Theme Dialog */}
      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.theme}</DialogTitle>
            <DialogDescription>
              Select your preferred app theme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <button
              onClick={() => {
                onThemeChange("light");
                setShowThemeDialog(false);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-colors ${
                theme === "light"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-5">
                <Sun className="w-6 h-6 text-yellow-500" />
                <span className="text-foreground">{t.lightMode}</span>
              </div>
              {theme === "light" && <Check className="w-5 h-5 text-primary" />}
            </button>
            <button
              onClick={() => {
                onThemeChange("dark");
                setShowThemeDialog(false);
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-colors ${
                theme === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-5">
                <Moon className="w-6 h-6 text-blue-400" />
                <span className="text-foreground">{t.darkMode}</span>
              </div>
              {theme === "dark" && <Check className="w-5 h-5 text-primary" />}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Color Theme Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.colorTheme}</DialogTitle>
            <DialogDescription>
              Pick your favorite color for the app
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-5">
            {colorThemes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  onColorThemeChange(theme.value);
                  setShowColorDialog(false);
                }}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-colors ${
                  colorTheme === theme.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${theme.color}`} />
                <span className="text-foreground">{theme.name}</span>
                {colorTheme === theme.value && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.language}</DialogTitle>
            <DialogDescription>
              Select your preferred language
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => {
                  onLanguageChange(lang.value);
                  setShowLanguageDialog(false);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-colors ${
                  language === lang.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-foreground">{lang.name}</span>
                </div>
                {language === lang.value && <Check className="w-5 h-5 text-primary" />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Friend Dialog */}
      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.addFriends}</DialogTitle>
            <DialogDescription>
              Enter your friend's username to send a request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="friend-username">Friend's Username</Label>
              <Input
                id="friend-username"
                placeholder="Enter username"
                value={friendUsername}
                onChange={(e) => setFriendUsername(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddFriendDialog(false);
                setFriendUsername("");
              }}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleAddFriend}
              disabled={!friendUsername.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.signOut}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSignOutDialog(false)}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t.signOut}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
