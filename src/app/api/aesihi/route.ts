import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Course } from "@prisma/client";
import fs from "fs";
const path = require('path');

export async function GET(request: NextRequest) {
    const emailTemplatePath = path.resolve(__dirname, '../../packages/templates/email.hbs');
const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
  return NextResponse.json({ msg:'yooo',emailTemplate }, { status: 200 });
}

