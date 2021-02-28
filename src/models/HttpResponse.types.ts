export interface SearchResults {
  total_count: number;
  incomplete_results: boolean;
  items: Array<UserAndOrganizations> | [];
}

export interface SearchAuthorCommits {
  total_count: number;
  incomplete_results: boolean;
  items: Array<any> | [];
}

export interface UserAndOrganizations {
  login: string;
  id?: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type: 'User' | 'Organization';
  site_admin?: boolean;
  score?: number;
}

export interface UserAdditionalInfo extends UserAndOrganizations {
  name: string | null;
  company?: string | null;
  blog?: string | null;
  location?: string | null;
  email?: null;
  hireable?: boolean | null;
  bio?: string | null;
  twitter_username?: string | null;
  public_repos?: number | null;
  public_gists?: number | null;
  followers?: number | null;
  following?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export type OrganizationMembers = UserAndOrganizations[];
