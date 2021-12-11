import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export function timestampToDate(timestamp?: Timestamp): Date {
  return new Date(timestamp?.getSeconds()! * 1000 - 9 * 60 * 60 * 1000);
}

export function timeAgo(date: Date) {
  const now = new Date();
  const interval = now.getTime() - date.getTime();
  const seconds = interval / 1000;
  if (seconds < 60) return "방금 전";
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 60) return `${Math.round(hours)}시간 전`;
  const days = hours / 12;
  return `${Math.round(days)}일 전`;
}
