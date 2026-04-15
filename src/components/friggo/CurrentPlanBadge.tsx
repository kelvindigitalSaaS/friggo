import { useState } from 'react';
import { Crown, Star, Sparkles, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSubscription, PLAN_DETAILS } from '@/contexts/SubscriptionContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PlansScreen } from './PlansScreen';
import { cn } from '@/lib/utils';

interface CurrentPlanBadgeProps {
 showUpgradeSheet?: boolean;
 className?: string;
}

export function CurrentPlanBadge({ showUpgradeSheet = true, className }: CurrentPlanBadgeProps) {
 const { subscription, trialDaysRemaining } = useSubscription();
 const [open, setOpen] = useState(false);

 if (!subscription) return null;

 const planDetails = PLAN_DETAILS[subscription.plan];

 const getPlanIcon = () => {
 switch (subscription.plan) {
 case 'premium':
 return <Crown className="h-3.5 w-3.5" />;
 case 'standard':
 return <Sparkles className="h-3.5 w-3.5" />;
 default:
 return <Star className="h-3.5 w-3.5" />;
 }
 };

 const getBadgeStyles = () => {
 switch (subscription.plan) {
 case 'premium':
 return ' text-white border-0 shadow-sm ';
 case 'standard':
 return 'bg-primary/20 text-primary border-primary/30';
 default:
 return 'bg-muted text-gray-500';
 }
 };

 const badgeLabel = planDetails.name + (trialDaysRemaining && trialDaysRemaining > 0 ? ` (${trialDaysRemaining}d)` : "");

 const badge = (
	 <Badge
		 className={cn(
			 'cursor-pointer transition-all hover:scale-105 gap-1',
			 getBadgeStyles(),
			 className
		 )}
	 >
		 {getPlanIcon()}
		 {badgeLabel}
	 </Badge>
 );

 if (!showUpgradeSheet || subscription.plan === 'premium') {
 return badge;
 }

 return (
 <Sheet open={open} onOpenChange={setOpen}>
 <SheetTrigger asChild>
 {badge}
 </SheetTrigger>
 <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
 <PlansScreen onClose={() => setOpen(false)} />
 </SheetContent>
 </Sheet>
 );
}
