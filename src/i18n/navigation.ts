import { createNavigation } from 'next-intl/navigation.js';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
