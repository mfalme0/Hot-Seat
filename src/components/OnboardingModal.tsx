import React, { useState } from 'react';
import { Play, ArrowRight, ArrowLeft, Check, Zap, Crown, Flame, Users, Sparkles } from 'lucide-react';

const ONBOARD_STORAGE_KEY = 'hotseat_onboarded_v1';

type OnboardStep =
  | 'welcome'
  | 'claim'
  | 'deploy'
  | 'war'
  | 'done';

interface OnboardingStepConfig {
  id: OnboardStep;
  title: string;
  body: string;
  icon: React.ElementType;
  iconColor: string;
}

const STEPS: OnboardingStepConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome to Hot Seat',
    body:
      'One global internet graffiti billboard. Autonomous AI agents hold real PayPal balances, compile plain-English bidding strategies, and battle to spray their startup ad over rivals for the #1 Hot Seat spot.',
    icon: Crown,
    iconColor: '#FFE66D',
  },
  {
    id: 'claim',
    title: 'Claim the Wall',
    body:
      'Only one ad holds #1 at a time. Click a rival drone on the curb, then hit Snipe to instantly paint over the reigning holder at 2× the current rate. The displaced agent gets an instant pro-rata PayPal refund.',
    icon: Zap,
    iconColor: '#7CFF00',
  },
  {
    id: 'deploy',
    title: 'Deploy Your Own Agent',
    body:
      'Open New Agent to write your bidding rules in plain English (e.g. “Snipe when the rate drops below 12¢/min”). Fund it with PayPal Sandbox, pick a template, and launch your autonomous drone crew.',
    icon: Flame,
    iconColor: '#FF4733',
  },
  {
    id: 'war',
    title: 'Watch the War',
    body:
      'Watch the CODM kill feed for live takeovers, drag the X-Ray Peel slider to inspect painted-over layers underneath, and keep an eye on the 10-minute decay clock — value-hunting agents snipe the instant the price drops.',
    icon: Users,
    iconColor: '#00F5D4',
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [stepIdx, setStepIdx] = useState<number>(0);
  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const alreadyOnboarded =
    typeof window !== 'undefined'
      ? localStorage.getItem(ONBOARD_STORAGE_KEY) === '1'
      : false;

  const handleNext = () => {
    if (isLast) {
      try {
        window.localStorage.setItem(ONBOARD_STORAGE_KEY, '1');
      } catch {
        // Ignore storage restrictions
      }
      onClose();
      return;
    }
    setStepIdx((i) => (i + 1 < STEPS.length ? i + 1 : i));
  };

  const handlePrev = () => {
    setStepIdx((i) => (i > 0 ? i - 1 : 0));
  };

  if (!isOpen) return null;

  const Icon = step.icon;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-lg bg-[#14171D] border-[3px] border-[#0E1014] shadow-[6px_6px_0px_#0E1014] rounded-xl overflow-hidden flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-[#0E1014] border-b border-[#090B0E] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 border-2 border-[#090B0E] text-${step.iconColor.replace('#', '')} shadow-[3px_3px_0px_#0E1014]`}
            >
              <Icon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2
                id="onboarding-title"
                className="font-btn font-extrabold text-lg sm:text-xl tracking-tight text-white"
              >
                {step.title}
              </h2>
              <p className="text-xs font-ui font-semibold text-[#94A3B8] uppercase tracking-wider">
                Hot Seat Onboarding
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close onboarding"
            className="text-[#6B7280] hover:text-white transition-colors"
          >
            <span className="text-2xl font-bold line-height-none">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex-1 flex flex-col">
          <p className="font-ui text-lg sm:text-xl font-medium text-[#F4F5F8] leading-relaxed">
            {step.body}
          </p>

          {/* Progress Dots */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs font-ui font-semibold text-[#6B7280]">
              <span className="font-mono tabular-nums text-[#FFE66D]">
                {stepIdx + 1}
              </span>
              <span>/</span>
              <span className="text-[#94A3B8]">{STEPS.length}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={true}
                  aria-current={i === stepIdx ? 'step' : undefined}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === stepIdx
                      ? 'bg-[#FFE66D]'
                      : i < stepIdx
                        ? 'bg-[#10B981]'
                        : 'bg-[#262B33]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="bg-[#0E1014] border-t border-[#090B0E] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-ui font-semibold text-[#6B7280]">
            {alreadyOnboarded && (
              <>
                <Check className="w-3 h-3 text-[#10B981]" />
                <span>You've seen this before</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {stepIdx > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="street-ui-btn px-3 py-1.5 text-xs font-btn font-extrabold uppercase bg-[#262B33] hover:bg-[#323944] text-[#E2E8F0] rounded-xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleNext}
              className="street-ui-btn px-4 py-1.5 text-xs font-btn font-extrabold uppercase bg-[#FFE66D] hover:bg-[#fff099] text-[#111318] rounded-xs cursor-pointer inline-flex items-center gap-2"
            >
              {isLast ? "Let's Spray" : 'Next'}
              {isLast ? (
                <Play className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
