//
//  LoginViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/19/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "LoginViewController.h"

@interface LoginViewController ()//<NSURLConnectionDelegate>
@property (weak, nonatomic) IBOutlet UITextField *usernameField;
@property (weak, nonatomic) IBOutlet UITextField *passwordField;
@end

@implementation LoginViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)login:(id)sender {
    [self.usernameField resignFirstResponder];
    [self.passwordField resignFirstResponder];
    NSString *loginURL = [[NSString alloc]initWithFormat:@"%@%@%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/login.php?username=", self.usernameField.text, @"&password=", self.passwordField.text];
    
    NSLog(@"%@", loginURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:loginURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    
//    NSString *strResult = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    
    if ([jsonDict count] > 0) {
        [self performSegueWithIdentifier:@"loginSuccessful" sender:self];
    }
}


//# pragma NSURLConnection Methods
//
//- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
//    
//    NSLog(@"received response");
//}
//
//- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data{
//    
//    NSLog(@"%@", data);
//    
//}
//
//- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
//    // Do cleanup
//    NSLog(@"ERROR");
//}
//
//- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
//    NSLog(@"Succeeded!");
//}




#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
//    CreateMessageViewController *targetVC = (CreateMessageViewController*)segue.destinationViewController;
//    targetVC.string1 = string1;
}


@end
