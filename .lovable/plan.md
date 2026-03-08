

# Hosting Checker Tool — Implementation Plan

## Overview
A hosting checker website inspired by hostingchecker.com where users enter a domain/URL and get detailed hosting information. Built with a modern, clean UI and powered by Supabase Edge Functions for server-side DNS lookups.

## Pages & Layout

### 1. Homepage (Hero + Search)
- Bold headline: "Find out who is hosting any website"
- Large search input with domain/URL placeholder and "Find Host" button
- Below: grid of tool cards linking to sub-tools
- Sidebar: Dev toolkit quick links
- SEO-friendly content section explaining the tool

### 2. Results Page
After submitting a domain, show:
- **Hosting Provider** — identified via IP range matching against known hosting providers
- **IP Address** — resolved from DNS
- **Server Location** — country/city from IP geolocation (using free ip-api.com)
- **DNS Records** — A, AAAA, MX, NS, TXT records
- **Domain WHOIS info** — registrar, creation date, expiry
- **Site status** — online/offline check

### 3. Additional Tool Pages (phase 2, can add later)
- Reverse Image Search
- Is Site Up or Down checker
- What is My IP
- Port Checker
- DNS Lookup

## Backend (Supabase Edge Functions)

### `hosting-lookup` Edge Function
- Accepts a domain name
- Performs DNS resolution (A records, NS records, MX records)
- Queries free IP geolocation API for server location
- Matches hosting provider from NS records and IP ranges against a built-in database of ~100+ known hosting providers (GoDaddy, AWS, Cloudflare, etc.)
- Returns structured JSON with all hosting details

### `site-status` Edge Function
- Checks if a site is up or down by making an HTTP HEAD request
- Returns response time and status code

## Design
- Clean, modern UI with white/light background
- Blue accent color scheme
- Responsive — works great on mobile and desktop
- Card-based layout for results
- Loading skeleton while fetching results

## Tech Stack
- React + TypeScript + Tailwind (already set up)
- Supabase Edge Functions for DNS lookups
- React Router for page navigation
- No database needed initially (stateless lookups)

