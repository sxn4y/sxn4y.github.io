export interface rList {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    updated_at: string;
    [key: string]: any; // optional
  }  