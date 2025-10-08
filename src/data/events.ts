import { Event } from '@/types';

export const EVENTS: Event[] = [
  // U-6 Age Group
  { id: "U6_KB", ageGroup: "U-6", event: "Kick Board Swimming", distance: "20 mts", gender: "Boys/Girls", fee: 100 },
  { id: "U6_HF", ageGroup: "U-6", event: "Hand Floaters Swimming", distance: "20 mts", gender: "Boys/Girls", fee: 100 },
  
  // U-8 Age Group
  { id: "U8_KB", ageGroup: "U-8", event: "Kick Board Swimming", distance: "40 mts", gender: "Boys/Girls", fee: 100 },
  { id: "U8_FS_B", ageGroup: "U-8", event: "Free Style", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U8_FS_G", ageGroup: "U-8", event: "Free Style", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U8_BK_B", ageGroup: "U-8", event: "Back Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U8_BK_G", ageGroup: "U-8", event: "Back Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  
  // U-10 Age Group
  { id: "U10_FS_40_B", ageGroup: "U-10", event: "Free Style", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U10_FS_40_G", ageGroup: "U-10", event: "Free Style", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U10_BR_40_B", ageGroup: "U-10", event: "Breast Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U10_BR_40_G", ageGroup: "U-10", event: "Breast Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U10_BK_40_B", ageGroup: "U-10", event: "Back Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U10_BK_40_G", ageGroup: "U-10", event: "Back Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U10_FS_80_B", ageGroup: "U-10", event: "Free Style", distance: "80 mts", gender: "Boys", fee: 100 },
  { id: "U10_FS_80_G", ageGroup: "U-10", event: "Free Style", distance: "80 mts", gender: "Girls", fee: 100 },
  
  // U-12 Age Group
  { id: "U12_FS_40_B", ageGroup: "U-12", event: "Free Style", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U12_FS_40_G", ageGroup: "U-12", event: "Free Style", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U12_BR_40_B", ageGroup: "U-12", event: "Breast Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U12_BR_40_G", ageGroup: "U-12", event: "Breast Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U12_BK_40_B", ageGroup: "U-12", event: "Back Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U12_BK_40_G", ageGroup: "U-12", event: "Back Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U12_BF_40_B", ageGroup: "U-12", event: "Butterfly", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U12_BF_40_G", ageGroup: "U-12", event: "Butterfly", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U12_FS_80_B", ageGroup: "U-12", event: "Free Style", distance: "80 mts", gender: "Boys", fee: 100 },
  { id: "U12_FS_80_G", ageGroup: "U-12", event: "Free Style", distance: "80 mts", gender: "Girls", fee: 100 },
  
  // U-14 Age Group
  { id: "U14_FS_40_B", ageGroup: "U-14", event: "Free Style", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U14_FS_40_G", ageGroup: "U-14", event: "Free Style", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U14_BR_40_B", ageGroup: "U-14", event: "Breast Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U14_BR_40_G", ageGroup: "U-14", event: "Breast Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U14_BK_40_B", ageGroup: "U-14", event: "Back Stroke", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U14_BK_40_G", ageGroup: "U-14", event: "Back Stroke", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U14_BF_40_B", ageGroup: "U-14", event: "Butterfly", distance: "40 mts", gender: "Boys", fee: 100 },
  { id: "U14_BF_40_G", ageGroup: "U-14", event: "Butterfly", distance: "40 mts", gender: "Girls", fee: 100 },
  { id: "U14_FS_80_B", ageGroup: "U-14", event: "Free Style", distance: "80 mts", gender: "Boys", fee: 100 },
  { id: "U14_FS_80_G", ageGroup: "U-14", event: "Free Style", distance: "80 mts", gender: "Girls", fee: 100 },
  { id: "U14_IM_B", ageGroup: "U-14", event: "Individual Medley", distance: "160 mts", gender: "Boys", fee: 100 },
  { id: "U14_IM_G", ageGroup: "U-14", event: "Individual Medley", distance: "160 mts", gender: "Girls", fee: 100 },
];

export const AGE_GROUPS = ["U-6", "U-8", "U-10", "U-12", "U-14"];

export const REGISTRATION_FEE = 100;
export const PER_EVENT_FEE = 100;
export const MAX_EVENTS_PER_PERSON = 2;
